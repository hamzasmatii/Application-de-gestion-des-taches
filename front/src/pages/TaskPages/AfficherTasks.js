import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TaskService from '../../services/TaskService';
import UserService from '../../services/UserServices';
import User from '../../Models/User';

const TaskPages = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await TaskService.getAll();
        setTasks(taskData);

        const userData = await UserService.getAll();
        setUsers(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Function to get user name by userId
  const getUserNameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.display() : 'Unknown User';
  };

  // Filter tasks by user name
  const filteredTasks = tasks.filter((task) => {
    const userName = getUserNameById(task.userId).toLowerCase();
    return userName.includes(searchQuery.toLowerCase()); // Case insensitive search
  });

  // Handle navigation to the add and update task page
  const navigateToUpdateTaskPage = (task) => {
    router.push({
      pathname: '/TaskPages/addAndupdateTask',
      query: { taskId: task.id, taskName: task.name, taskStatus: task.status, taskUserId: task.userId },
    });
  };

  // Handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await TaskService.delete(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove deleted task from the state
    } catch (error) {
      setError('Error deleting task: ' + error.message);
    }
  };

  // Navigate to the 'AfficherUsers' page
  const navigateToUserPage = () => {
    router.push('/UserPages/AfficherUsers');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Tasks</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Search Input for filtering tasks by user name */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by User Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Button to navigate to addAndUpdateTask page */}
      <div className="mb-6 text-center">
        <button
          onClick={() => router.push('/TaskPages/addAndupdateTask')}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create New Task
        </button>
      </div>

      {/* Button to navigate to AfficherUsers page */}
      <div className="mb-6 text-center">
        <button
          onClick={navigateToUserPage}
          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          View Users
        </button>
      </div>

      {/* Display Tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{task.name}</h2>
              <p className="text-gray-500 mb-2">
                Status: <span className={`font-semibold ${task.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{task.status}</span>
              </p>
              {/* Display user name instead of user ID */}
              <p className="text-gray-400">Assigned to: {getUserNameById(task.userId)}</p>

              {/* Update and Delete buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigateToUpdateTaskPage(task)} // Navigate to update page with task data
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task.id)} // Handle task deletion
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskPages;
