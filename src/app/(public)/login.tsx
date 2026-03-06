import { LoginView } from "@/screens/auth/Login.view";
import { useLoginViewModel } from "@/screens/auth/useLogin.viewModel";

export default function Login() {
  const viewModel = useLoginViewModel();

  return <LoginView {...viewModel} />;
}
