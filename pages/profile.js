import ProtectedRoute from "../lib/routing/ProtectedRoute";
import ProfileScreen from "../components/ProfileScreen";

export default function Profile() {
    return (
        <ProtectedRoute>
            <ProfileScreen />
        </ProtectedRoute>
    );
}
