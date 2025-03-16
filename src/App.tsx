import React from 'react';
import { useState } from 'react';
import { X, ArrowRight, Upload, ToggleLeft as Google, Twitter, Lock, Mail, Eye, EyeOff } from 'lucide-react';

type Step = 'login' | 'register-step1' | 'register-step2' | 'register-step3';

type Tool = {
  name: string;
  icon: string;
  url: string;
};

const designTools: Tool[] = [
  {
    name: 'Figma',
    icon: 'https://cdn.discordapp.com/attachments/802208832201031731/1350897030633099284/figma.png?ex=67d86866&is=67d716e6&hm=7d221f080654e333e0eb068588942dae3beed05555c3efad43fdcb5034f0b6e1&',
    url: 'figma.com'
  },
  {
    name: 'Adobe XD',
    icon: 'https://media.discordapp.net/attachments/802208832201031731/1350898389696381089/xd.png?ex=67d869aa&is=67d7182a&hm=1b234f2c2c4b7a325b647b921d7398c768d4e664529815c4a8023c8a9fcf738e&',
    url: 'adobe.com'
  },
  {
    name: 'Sketch',
    icon: 'https://media.discordapp.net/attachments/802208832201031731/1350898389931397150/sketch.png?ex=67d869aa&is=67d7182a&hm=8b94155a8cbdd516104b7f57c940e79e93ca666dfb5c4d7ac9fd7d3c724469e0&',
    url: 'sketch.com'
  },
  {
    name: 'Framer',
    icon: 'https://media.discordapp.net/attachments/802208832201031731/1350898390145175633/picture.png?ex=67d869aa&is=67d7182a&hm=d94bddf72e9095193930540af1a5ed84d2a5315986b73b502470f6dd9ab17cc5&',
    url: 'framer.com'
  },
  {
    name: 'Webflow',
    icon: 'https://media.discordapp.net/attachments/802208832201031731/1350898390388441099/images.png?ex=67d869aa&is=67d7182a&hm=cacdabb63dd3ad211db60c1e160608bc9363b444d8c2be7c2ea96fb99422355d&',
    url: 'webflow.com'
  },
  {
    name: 'Adobe Illustrator',
    icon: 'https://media.discordapp.net/attachments/802208832201031731/1350898390606680064/illustrator.png?ex=67d869aa&is=67d7182a&hm=f19c53b91d3254b26393808b213345f1186592785f926c3e0770e7ce16d76785&',
    url: 'adobe.com'
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    introduction: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateStep1 = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(error => error !== '');
  };

  const validateStep3 = () => {
    const newErrors = {
      username: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleNext = () => {
    if (currentStep === 'register-step1' && !validateStep1()) {
      return;
    }
    if (currentStep === 'register-step3' && !validateStep3()) {
      return;
    }

    const steps: Step[] = ['register-step1', 'register-step2', 'register-step3'];
    const currentIndex = steps.indexOf(currentStep as Step);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['register-step1', 'register-step2', 'register-step3'];
    const currentIndex = steps.indexOf(currentStep as Step);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      setCurrentStep('login');
    }
  };

  const toggleTool = (toolName: string) => {
    setSelectedTools(prev => 
      prev.includes(toolName)
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  const handleComplete = () => {
    if (!validateStep3()) {
      return;
    }
    // Here you would typically submit the form data
    console.log('Form submitted:', { ...formData, selectedTools });
    setCurrentStep('login');
  };

  const renderLogin = () => (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-gray-500 mt-1">Please enter your details to sign in</p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={20} className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye size={20} className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Forgot password?
          </button>
        </div>

        <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
          Sign in
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 px-4 border border-gray-300 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <Google size={20} />
            <span>Google</span>
          </button>

          <button className="py-3 px-4 border border-gray-300 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <Twitter size={20} />
            <span>Twitter</span>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setCurrentStep('register-step1')}
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegisterStep1 = () => (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Create a profile</h2>
          <p className="text-gray-500 mt-1">Set up your profile in less than 5 minutes</p>
        </div>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setCurrentStep('login')}
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 px-4 border border-gray-300 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <Google size={20} />
            <span>Google</span>
          </button>

          <button className="py-3 px-4 border border-gray-300 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <Twitter size={20} />
            <span>Twitter</span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with email</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        <button
          className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
          onClick={handleNext}
        >
          <span>Continue</span>
          <ArrowRight size={20} />
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => setCurrentStep('login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegisterStep2 = () => (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Tell us more about you</h2>
          <p className="text-gray-500 mt-1">What tools do you currently use in your design business?</p>
        </div>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleBack}
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {designTools.map((tool) => (
            <button
              key={tool.name}
              className={`p-4 border rounded-lg transition-all ${
                selectedTools.includes(tool.name)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
              onClick={() => toggleTool(tool.name)}
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-12 h-12 mx-auto mb-2 rounded-lg object-cover"
              />
              <p className="text-sm font-medium text-center">{tool.name}</p>
              <p className="text-xs text-gray-500 text-center">{tool.url}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleBack}
          >
            Go back
          </button>
          <button
            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
            onClick={handleNext}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const renderRegisterStep3 = () => (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold">Choose a username</h2>
          <p className="text-gray-500 mt-1">Choose a username and write a brief introduction</p>
        </div>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          onClick={handleBack}
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-lg">
              <Upload size={20} />
            </button>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.username}
                onChange={handleInputChange}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-sm text-gray-400">untitled.ui/@{formData.username || 'username'}</span>
              </div>
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">{errors.username}</p>
            )}
          </div>
        </div>

        <textarea
          name="introduction"
          placeholder="Write a brief introduction to show in your profile..."
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          value={formData.introduction}
          onChange={handleInputChange}
        ></textarea>

        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={handleBack}
          >
            Go back
          </button>
          <button 
            className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
            onClick={handleComplete}
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );

  const getStepOffset = (step: Step) => {
    const steps = ['register-step1', 'register-step2', 'register-step3'];
    const currentIndex = steps.indexOf(currentStep as string);
    const stepIndex = steps.indexOf(step);
    
    if (currentStep === 'login' || step === 'login') return 0;
    if (currentIndex === -1 || stepIndex === -1) return 0;
    
    return (stepIndex - currentIndex) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative flex items-center">
        {['register-step1', 'register-step2', 'register-step3'].map((step) => (
          <div
            key={step}
            className={`absolute transition-all duration-500 ease-in-out ${
              step === currentStep ? 'z-10 opacity-100 scale-100' : 'opacity-40 scale-90'
            }`}
            style={{
              transform: `translateX(${getStepOffset(step as Step)}%) scale(${
                step === currentStep ? 1 : 0.9
              })`,
            }}
          >
            {step === 'register-step1' && renderRegisterStep1()}
            {step === 'register-step2' && renderRegisterStep2()}
            {step === 'register-step3' && renderRegisterStep3()}
          </div>
        ))}
        <div
          className={`transition-all duration-500 ease-in-out ${
            currentStep === 'login' ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-90 -z-10'
          }`}
        >
          {renderLogin()}
        </div>
      </div>
    </div>
  );
}

export default App;