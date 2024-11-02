from scipy.integrate import quad
from info import f
import numpy as np
from info import lower
from info import upper
from info import divide

def integrand_real(x):
    return np.real(f(x))
    
def integrand_imaginary(x):
    return np.imag(f(x))
    
real = quad(integrand_real, lower, upper)[0]/divide
imaginary = quad(integrand_imaginary, lower, upper)[0]/divide
    
print(real)
print(imaginary)
