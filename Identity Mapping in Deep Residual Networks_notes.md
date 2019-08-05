## Identity Mapping in Deep Residual Networks

---

ResNet解决的不是Gradient Vanishing/Exploding, 而是Model Degradation（模型退化）。

模型退化：随着层数增加，准确率趋于饱和，然后开始快速下降<font color="#FF0000">（且这种下降不是因为Overfitting, 表现在training error也开始快速下降。）</font> 

附加的层数使用identity mapping，其他部分使用已习得的模型，照理说trainng error应该不会高于直接使用原模型，但是实验观察到了下降（或无法收敛）

原residual block的形式为：
$$
y_l = h(x_l) + F(x_l, W_l)\tag{1}
$$

$$
x_{l+1} = f(y_l)\tag{2}
$$

其中h为identity mapping， F为残差函数，f为ReLU，可以看到(2)中f不是identity mapping.

论文的核心是把这个改成identity mapping，假设$x_{l+1}=y_l$.

当f也是identity mapping时，可以得到：
$$
x_{l+1}=h(x_l)+F(x_l,w_l)\tag{3}
$$
这样对于$l$之后的任意深度$L$,都有：
$$
x_L = h(x_l) + \sum_{i=l}^{L-1}F(x_i,W_i)\tag{4}
$$
如果不考虑dimension mapping, $h(x_l) = x_l$
$$
x_L = x_l + \sum_{i=l}^{L-1}F(x_i,W_i)\tag{5}
$$
这个递推式良好的性质是，任意深度表示为之前某一深度加上残差函数的和，而阈值相对的是Plain Network中(忽略BN和ReLU)：
$$
x_L = \prod_{i=l}^{L-1}W_ix_i\tag{6}
$$
对于(5)，反向求导也很方便，这里就不写出来了，链式法则相乘，其中每一项形如$1+\frac{\partial F(x_i,W_i)}{\partial{x_l}}$

而且这也表现了在一个mini-batch中梯度更难为0，因为这要求这个batch中所有样本$\frac{\partial F(x_i,W_i)}{\partial{x_l}}$全部接近-1，而对于plain network，则是该项接近0，显然全部接近-1的可能性比全部接近0的可能性小。

<font color="#FF0000">**模型退化问题的原因是优化问题，而不是表达能力的问题。**</font>

##pre-activation好用的原因：

1. pre_activation使得f变成上文所说的identity mapping，优化更简单
2. 之前的resnet虽然使用了BN+ReLU，但是马上加上了shortcut传过来的identity，因此BN的作用到下一层时被减弱了，而pre_activation保证了输入总是被BN正则化的，overfitting的问题能够被解决。
