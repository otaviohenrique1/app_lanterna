import { PaperProvider } from "react-native-paper";
import HomePage from './src/HomePage';

export default function App() {
  return (
    <PaperProvider>
      <HomePage />
    </PaperProvider>
  );
}
