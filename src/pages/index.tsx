import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to the Vehicle Transfer System</h1>
      <ul>
        <li>
          <a href="/drivers">Drivers</a>
        </li>
        <li>
          <a href="/vehicles">Vehicles</a>
        </li>
        <li>
          <a href="/transfers/create">Transfer Vehicle</a>
        </li>
        <li>
          <a href="/transfers/history">Transfer History</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
