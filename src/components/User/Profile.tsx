
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) {
    return null;
  }

  const renderRol = (rol: number) => {
    switch (rol) {
        case 1:
            return (
                <div className="flex">
                    <span className="flex flex-row bg-orange-100 text-orange-500 items-center h-full gap-x-2 px-2.5 py-0.5 text-xs font-medium rounded-full">
                        <p className="my-auto">Administrador</p>
                    </span>
                </div>
            );
        case 2:
            return (
                <div className="flex">
                    <span className="flex flex-row bg-sky-100 text-sky-500 items-center h-full gap-x-2 px-2.5 py-0.5 text-xs font-medium rounded-full">
                        <p className="my-auto">Vendedor</p>
                    </span>
                </div>
            );
        case 3:
            return (
                <div className="flex">
                    <span className="flex flex-row bg-sky-100 text-sky-500 items-center h-full gap-x-2 px-2.5 py-0.5 text-xs font-medium rounded-full">
                        <p className="my-auto">Cliente</p>
                    </span>
                </div>
            );
 
        default:
            return <div className="">{rol}</div>;
    }
};
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center">
              <div className="h-24 w-24 rounded-full bg-indigo-100 mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {user.email[0].toUpperCase()}
                </span>
              </div>
              {/* <h3 className="mt-4 text-lg font-medium text-gray-900">{user.email}</h3>
              <p className="mt-1 text-sm text-gray-500 capitalize">{user.rol_id}</p> */}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Rol</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{renderRol(user.rol_id)}</dd>
                </div>
               
              </dl>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cerrar sesion 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;