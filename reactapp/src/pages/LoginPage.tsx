import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../services/AuthService";
type Inputs = {
    email: string,
    password: string
}
function LoginPage() {
    const { register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onLogin:SubmitHandler<Inputs> = (payload) =>{
        login(payload)
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-lg font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleSubmit(onLogin)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder=""
                            className="w-full p-3 border border-l-gray-300 rounded focus:outline-none focus:ring h-10"
                            autoComplete="off"
                            {...register('email', {required: true})}
                            
                        />
                        {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            placeholder=""
                            className="w-full p-3 border border-l-gray-300 rounded focus:outline-none focus:ring h-10"
                            {...register('password', {required: true})}
                        />
                        {errors.password && <span className="text-red-600 text-xs">Password is required</span>}
                    </div>

                    <div className="mb-6">
                        <button className="w-full bg-blue-500 text-white font-bold hover:bg-blue-700 rounded-xl p-2" type="submit">Login</button>
                    </div>

                    <p className="text-left text-blue-700">
                        <a href="#">Forgot password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
