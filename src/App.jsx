import Header from "./Components/Header";
import Meals from "./Components/Meals";
import chickencurry from '../backend/public/images/chicken-curry.jpg'
import CreateCart from "./store/CreateCart";
import UserProgress from "./store/UserProgress";
import Cart from "./Components/Cart";
import { UserProgressProvider } from "./store/UserProgress";
import Checkout from "./Components/Checkout";


function App() {

  return (
    <UserProgressProvider>
    <CreateCart>
      <Header/>
      <Meals />
      <Cart/>
      <Checkout/>
    </CreateCart>
    </UserProgressProvider>
  );
}

export default App;
