from numpy import cos, sin, power, pi, linspace
import pandas as pd
from scipy.interpolate import CubicSpline

df = pd.read_csv('logo.csv')
df['y'] = -df['y']
x = list(df['x'])
y = list(df['y'])
t = linspace(0, 2*pi, len(x))

inter_x = CubicSpline(t, x)
inter_y = CubicSpline(t, y)

def f(t):
    
    x = inter_x(t)
    y = inter_y(t)

    return x + (1j)*(y)

harmonics = 50
lower = 0
upper = 2*pi
divide = upper - lower
