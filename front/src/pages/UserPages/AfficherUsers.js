import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserService from "../../services/UserServices";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserService.getAll();
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Liste des utilisateurs</h1>

      {/* Button to navigate to Create User page */}
      <button
        onClick={() => router.push("/UserPages/CreateUser")}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
      >
        Créer un utilisateur
      </button>

      {/* Button to navigate to Tasks page */}
      <button
        onClick={() => router.push("/TaskPages/AfficherTasks")}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4 ml-4"
      >
        Voir les Tâches
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center p-4 border-b border-gray-200"
            >
              {/* Column for Nom and Prenom */}
              <div className="flex-1">
                <span className="text-xl font-medium">{user.nom} {user.prenom}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersPage;
