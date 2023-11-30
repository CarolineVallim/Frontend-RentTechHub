import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Spacer } from '@nextui-org/react';
import { AuthContext } from '../../Context/auth.context';

function LogoutPage() {
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    logOut();
  }, [logOut]);

  return (
    <div className="log-out-container">
      <div>
        <h1>Logout from RentTechHub</h1>
        <p>You have been successfully logged out.</p>
        <Spacer y={1} />
        <div>
          <Link to="/login">
            <Button auto>Login Again</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
