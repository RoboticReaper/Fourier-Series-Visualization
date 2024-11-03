# How to run

Have `scipy`, `numpy`, and `pandas` installed for Python. 
Run `npm install` to install dependencies: `child_process` and `express` 

Run `npm start` and open `localhost:3000` in your browser to visualize the graph.

# Variables

`info.py` is where the function to graph is defined. You can treat the variable `x` and `y` as parametric equations, in term of `t`. 
`harmonics` variable creates complex coefficients from `C-n` to `C-1` and `C1` to `Cn`, resulting in `2*harmonics` of circles in the end. If the graph looks weird, adjust the number based on the complexity of the graph.
The range of x values that the graph will show is from 0 to 2pi. 