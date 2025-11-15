import { useAuth0 } from '@auth0/auth0-react';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 shadow-xl">
      <div className="flex flex-col items-center gap-6">
        
        {user.picture && (
          <div className="relative">
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-400 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900"></div>
          </div>
        )}

        <div className="w-full space-y-4">
          {user.name && (
            <div className="flex items-center gap-3 text-white/90">
              <User className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
            </div>
          )}

          {user.email && (
            <div className="flex items-center gap-3 text-white/90">
              <Mail className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Email</p>
                <p className="text-sm break-all">{user.email}</p>
              </div>
            </div>
          )}

          {user.email_verified !== undefined && (
            <div className="flex items-center gap-3 text-white/90">
              <Shield className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Email Status</p>
                <p className="text-sm">
                  {user.email_verified ? (
                    <span className="text-green-400">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-400">⚠ Not Verified</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {user.updated_at && (
            <div className="flex items-center gap-3 text-white/90">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide">Last Updated</p>
                <p className="text-sm">
                  {new Date(user.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
