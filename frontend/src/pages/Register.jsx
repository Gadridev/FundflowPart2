import { useNavigate, Link } from 'react-router-dom';
import { Logo, InputField } from '../components/ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
const EMPTY = { name: "", email: "", password: "", role: "" }
export default function Register() {
  const [form, setForm] = useState(EMPTY);
  const user=useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }
   useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [user.isAuthenticated]);
  console.log(form)
  async function handelSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.role) return seterror("Veuillez choisir les champs")
    seterror("");
    try {
      dispatch(registerUser({ name: form.name, email: form.email, password: form.password, role: form.role }))
    } catch (err) {
      seterror(err.response?.data?.message ?? "Une erreur est survenue.");
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-9">
      <div className="w-[420px]">

        <div className="text-center mb-9">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="font-display text-[26px] font-extrabold text-text-primary mb-2">Créer un compte</h1>
          <p className="text-sm text-text-muted">Rejoignez FundFlow en tant que porteur de projet</p>
        </div>


        <form onSubmit={handelSubmit}>
          <div className="bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 flex flex-col gap-[18px]">
            <div className="grid grid-cols-2 gap-3.5">
              <InputField label="Nom" type="text" placeholder="Alami" value={form.name} onChange={set("name")} />
              <InputField label="Email" type="email" placeholder="vous@exemple.ma" value={form.email} onChange={set("email")} />
            </div>
            <InputField label="Mot de Passe" type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Role
              </label>

              <select
                className="  w-full
      rounded-xl
      border
      border-gray-300
      bg-white
      px-4
      py-3
      text-sm
      text-gray-800
      outline-none
      transition
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-200"
                value={form.role}
                onChange={set("role")}
              >
                <option value="" disabled>
                  Select role
                </option>

                <option value="investor">
                  Investor
                </option>

                <option value="project_owner">
                  Project Owner
                </option>
              </select>
            </div>

            <button
              className="btn-primary w-full py-3 mt-1"
              type='submit'
            >
              Créer mon compte →
            </button>

            <p className="text-center text-[13px] text-text-muted">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-accent-green hover:opacity-80 transition-opacity">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
