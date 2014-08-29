# Point Layout
At some point in life you find yourself in need of an algorithm that can lay out nodes in a tree-like structure. And these nodes want to loop back on themselves. We've all been there, right?

...right?

Well anyway, here's a layout engine that does just that. No bells, no whistles, just a tree. The demo is pretty basic: you click on a start node and then you click on an end node. If the start node is the same as the end node, you get a new node. Branch away, connect to parents, knock yourself out.

## Bugs and issues
There are a couple of issues remaining.
* Two sibling branches can easily overlap
* There's no clever interpolation if you connect two nodes to the same node
* More bugs? Probably?
