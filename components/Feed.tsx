import UserModel from "../backend/models/UserModel";

const Feed = (users: any) => {
  console.log(users);
  return (
    <div className="bg-white border-gray-200 border-solid border p-3">
      <h2>FEED</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
        nostrum consectetur repellat praesentium voluptatibus voluptate unde
        perspiciatis? Accusamus blanditiis maiores aperiam porro adipisci qui.
        Architecto cumque mollitia rerum nisi dicta.
      </p>
    </div>
  );
};

export default Feed;
