const PotentialChats = ({ potentialChats, createChat, user, onlineUsers }) => {
  return (
    <div className="flex overflow-x-auto border-b border-gray-700 space-x-2 p-2 custom-scrollbar">
      {potentialChats.length > 0 ? (
        potentialChats.map((u) => {
          const isOnline = onlineUsers?.some(
            (onlineUser) => onlineUser?.userId === u?._id
          );

          return (
            <div
              key={u._id}
              className="relative flex flex-col items-center justify-center min-w-[70px] px-2 py-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              onClick={() => user && createChat(user._id, u._id)}
            >
              <span
                className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>

              <span className="text-xs font-medium text-white">{u.name}</span>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No users available</p>
      )}
    </div>
  );
};

export default PotentialChats;
