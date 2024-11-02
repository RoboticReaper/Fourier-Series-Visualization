from scipy.integrate import quad
from info import f
from info import harmonics
from info import lower
from info import divide
from info import upper
import numpy as np


for i in range(1, harmonics+1):
    def integrand_real(x):
        return np.real(f(x) * np.exp(1j * -i  * x))
    
    def integrand_imaginary(x):
        return np.imag(f(x) * np.exp(1j * -i * x))
    
    real = quad(integrand_real, lower, upper)[0]/divide
    imaginary = quad(integrand_imaginary, lower, upper)[0]/divide
    
    print(real)
    print(imaginary)
    
    