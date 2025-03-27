import { useState } from "react";
import Login from "./login";
import Homescreen from "./(tabs)/homescreen";

export default function Index() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  if (isAuthenticated) {
    return(<Homescreen />);
  }
  return(<Login />);
}