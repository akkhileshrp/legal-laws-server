import React from 'react'

const App = () => {
    const handleSignInWithGoogle = async () => {
        try {
            const googleResponse = await fetch('http://localhost:8000/google-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: googleToken }), // Replace googleToken with the actual Google token
            });
            const googleData = await googleResponse.json();
            console.log(googleData); // Do something with the response data
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };
    return (
        <button onClick={handleSignInWithGoogle}>Login</button>
    )
}

export default App