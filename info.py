from numpy import cos, sin, power, pi

def f(t):
    A = 1
    B = 1
    a = 5
    b = 4
    p = pi/2
    
    x = A*sin(a*t+p)
    y = B*sin(b*t)

    return x + (1j)*(y)

harmonics = 20
lower = 0
upper = 2*pi
divide = upper - lower
max_x = 1
