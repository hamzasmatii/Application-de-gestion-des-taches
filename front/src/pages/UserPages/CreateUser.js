import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import UserService from "../../services/UserServices";

const CreateUserPage = () => {
  const [userData, setUserData] = useState({ nom: "", prenom: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // State for success message
  const router = useRouter(); // Initialize router for redirection

  useEffect(() => {
    // Focus on the first input when the component is mounted
    document.getElementById("nom").focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(""); 

    // Simple validation for name and surname
    if (!userData.nom || !userData.prenom) {
      setError("Veuillez remplir tous les champs.");
      setLoading(false);
      return;
    }

    // Additional validation (optional): check for valid name format (only letters)
    const nameRegex = /^[A-Za-zÀ-ÿ]+$/; // Regex for French letters
    if (!nameRegex.test(userData.nom) || !nameRegex.test(userData.prenom)) {
      setError("Le nom et le prénom ne doivent contenir que des lettres.");
      setLoading(false);
      return;
    }

    try {
      const newUser = await UserService.create(userData);
      setSuccess("Utilisateur créé avec succès!");
      setUserData({ nom: "", prenom: "" }); // Reset form after success
      console.log("Utilisateur créé :", newUser);
      
      // Redirect to "AfficherUsers" page
      router.push("/UserPages/AfficherUsers"); // Redirect after successful creation
    } catch (err) {
      setError("Erreur lors de la création de l'utilisateur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Créer un utilisateur</h1>
      
      {/* Success Message */}
      {success && <p className="text-green-600 text-sm text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom Field */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="nom"
            id="nom"
            value={userData.nom}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        
        {/* Prenom Field */}
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="prenom"
            id="prenom"
            value={userData.prenom}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition duration-300 ease-in-out"
          >
            {loading ? "Chargement..." : "Créer l'utilisateur"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
    </div>
  );
};

export default CreateUserPage;
