import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import TaskService from '../../services/TaskService';
import UserService from '../../services/UserServices';

const AddAndUpdateTask = () => {
  const router = useRouter();
  const { taskId } = router.query;

  const [name, setName] = useState('');
  const [status, setStatus] = useState('EN_COURS');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(null); // Error state

  const statuses = ['EN_COURS', 'TERMINEE', 'EN_ATTENTE'];

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading to true when fetching users
        const fetchedUsers = await UserService.getAll();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setError('Unable to fetch users.');
      } finally {
        setLoading(false); // Set loading to false when finished
      }
    };

    fetchUsers();
  }, []);

  // Fetch task details if we are updating
  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (taskId) {
        try {
          setLoading(true);
          const taskData = await TaskService.getById(taskId);
          setTaskDetails(taskData);
          setName(taskData.name);
          setStatus(taskData.status);
          setUserId(taskData.userId.toString()); // Ensure userId is a string for select element
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de la tâche:', error);
          setError('Unable to fetch task details.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !userId) {
      setError('Please fill in all fields.');
      return;
    }

    const taskData = {
      name,
      status,
      userId: parseInt(userId), // Ensure userId is an integer
    };

    try {
      setLoading(true); // Set loading to true during submission

      if (taskId) {
        await TaskService.update(taskId, taskData); // Update task
      } else {
        await TaskService.create(taskData); // Create new task
      }

      router.push('/TaskPages/AfficherTasks'); // Redirect after submission
    } catch (error) {
      console.error('Erreur lors de la soumission de la tâche:', error);
      setError('Failed to submit task. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {taskId ? 'Mettre à jour la tâche' : 'Créer une nouvelle tâche'}
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>} {/* Error display */}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="taskName" className="block text-gray-700">Nom de la tâche</label>
          <input
            type="text"
            id="taskName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="taskStatus" className="block text-gray-700">Statut</label>
          <select
            id="taskStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            {statuses.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption === 'EN_COURS' ? 'En cours' : 
                 statusOption === 'TERMINEE' ? 'Terminée' : 'En attente'}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700">Attribuer à l'utilisateur</label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>Choisir un utilisateur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nom} {user.prenom}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Enregistrement...' : (taskId ? 'Mettre à jour la tâche' : 'Créer la tâche')}
        </button>
      </form>
    </div>
  );
};

export default AddAndUpdateTask;
