import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const baseUrl = 'http://localhost:4000';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [friends, setFriends] = useState([]);

  const addFriend = () => {
    axios
      .post(`${baseUrl}/addfriend`, { name, age })
      .then(response => setFriends([...friends, response.data]));
  };

  const updateFriend = id => {
    const newAge = prompt('Enter new age:');

    axios
      .put(`${baseUrl}/update`, { newAge, id })
      .then(() =>
        setFriends(
          friends.map(friend =>
            friend._id === id ? { ...friend, age: newAge } : friend
          )
        )
      );
  };

  const deleteFriend = id => {
    axios
      .delete(`${baseUrl}/delete/${id}`)
      .then(() => setFriends(friends.filter(friend => friend._id !== id)));
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/read`)
      .then(response => {
        setFriends(response.data);
      })
      .catch(() => console.log('ERR'));
  }, []);

  return (
    <div className='App'>
      <div className='inputs'>
        <input
          type='text'
          placeholder='Friend name...'
          onChange={e => setName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Friend age...'
          onChange={e => setAge(e.target.value)}
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className='friends'>
        {friends.map(friend => (
          <div key={friend._id} className='friend'>
            <h3>Name: {friend.name}</h3>
            <h3>Age: {friend.age}</h3>
            <div className='buttons'>
              <button onClick={() => updateFriend(friend._id)}>Update</button>
              <button onClick={() => deleteFriend(friend._id)}>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
