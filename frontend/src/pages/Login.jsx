import { useNavigate, Link } from 'react-router-dom';
import { Logo, InputField } from '../components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loginUser } from '../store/authSlice';

const emptyform = {
  email: "",
  password: ""
}
export default function Login() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth)
  console.log(user)
  const [formData, setFormData] = useState(emptyform)
  const dispatch = useDispatch();
  function handelChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  useEffect(() => {
  if (user.isAuthenticated) {
    navigate("/", { replace: true });
  }
}, [user.isAuthenticated]);
  console.log(formData)
  async function handelSubmit(e) {
    console.log("testing")
    e.preventDefault();
    dispatch(loginUser({ email: formData.email, password: formData.password }))

  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-9">
      <div className="w-[420px]">

        <div className="text-center mb-9">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="font-display text-[26px] font-extrabold text-text-primary mb-2">Connexion</h1>
          <p className="text-sm text-text-muted">Accédez à votre espace porteur de projet</p>
        </div>


        <form onSubmit={handelSubmit}>

          <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 flex flex-col gap-[18px]">
            <InputField label="Email" type="email" placeholder="vous@exemple.ma" onChange={(e) => handelChange("email", e.target.value)}/>
            <InputField label="Mot de Passe" type="password" placeholder="••••••••" onChange={(e) => handelChange("password", e.target.value)}/>

            <button
              className="btn-primary w-full py-3 mt-1"
              type='submit'

            >
              Se Connecter →
            </button>

            <p className="text-center text-[13px] text-text-muted">
              Pas de compte ?{' '}
              <Link to="/register" className="text-accent-green hover:opacity-80 transition-opacity">
                S'inscrire
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div >
  );
}
