import { useAuth } from '../context/AuthContext';

const TestComponent = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <p>Current User: {currentUser.email}</p>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}

export default TestComponent;
