import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { app } from './firebaseConfig'; // Firebase configuration
import github from '../images/github.svg';
import google from '../images/google1.png';
import { useNavigate } from 'react-router-dom';
import { actionFailure, loginUserRequest } from '../features/library/librarySlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
const auth = getAuth(app);

interface authProps {
  role: string
}

function Auth(props: authProps) {
  const {role} = props;
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState<string>(role);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google Sign-in successful:', result.user);
      const userData = result.user;
      dispatch(loginUserRequest({ email: userData.email ?? "no-email@example.com", password : userData?.uid, role: userRole }));
      navigate('/');

    } catch (error) {
      console.error('Google Sign-in error:', error);
      actionFailure({msg: 'Google Sign-in failed. Please try again.', type: 'error' });
    }
  };

  const handleGitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('GitHub Sign-in successful:', result.user);
    } catch (error) {
      console.error('GitHub Sign-in error:', error);
    }
  };

  return (
    <div className='auth-section'>
      <button className='auth-buttons' onClick={handleGoogleSignIn}><img width={20} src={google} alt="No img" /></button>
      <button className='auth-buttons' onClick={handleGitHubSignIn}><img width={20} src={github} alt="No img" /></button>
    </div>
  );
}

export default Auth;
