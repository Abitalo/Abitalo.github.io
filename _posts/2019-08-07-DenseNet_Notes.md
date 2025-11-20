---
layout: post
title: "DenseNet Notes"
date: 2019-08-07
tags: [Deep Learning, DenseNet]
---
## **Pre-activation**
---
使用了*Identity Mapping in Residual Learning*中的pre-activation思想，每个Conv+非线性的组合$H(·)$使用的是$BN+ReLU+3 \times 3\ Conv$

---
## **特征重用方式**
在一个DenseBlock中，使用$concat$而不是ResNet中的$add$来完成特征重用。

$$
x_l = H(x_{l-1})+I(x_{l-1})
$$
一般$I$使用Identity Mapping，最多用个$1\times\ 1Conv$来做维数匹配。
$$
x_l = H([x_0,...,x_{l-1}])
$$
直接将所有previous层的输出concat到一起。

---
## **Transition层替代Pooling**
* $1\times1\ Conv + 2\times2\ AvgPooling$.
* 同样使用Pre-activation结构。
* 使用$\theta$ 控制$1\times1\ Conv$的输出通道数, 称为$compression\_rate$.

---
## **DenseNetB and DenseNetBC**
### **DenseNet-B**:
B stands for *Bottleneck*.对于每一个DenseLayer,使用$bn\_size*k$的bottleneck结构，即先过一个$1\times1\ Conv$ 将channels变成$bn\_size*k$，然后再进行$3 \times 3\ Conv$,所有Conv都使用pre-activation.
($bn\_size*k$ 这个值其实是比最终的该层输出的channels数$k$ 大的，论文原文提到使用固定的16或者$bn\_size = 2\quad in\ DenseNet\!-\!BC$来计算Bottleneck中间的通道数。但pytorch官方实现使用的$bn\_size = 4$。猜想是因为该数字等于一个DenseBlock中BlockLayer的层数。
### **DenseNet-BC**
在DenseNet-B的基础上，加上了 $compression\_rate\in(0,1]$,实际上就是在Transition层的$1\times1\ Conv$中，将输出channels设置为$compression\_rate*input\_channels.$ DenseNet-BC中$compression\_rate =1$,DenseNet-BC在Pytorch官方实现中为$compression\_rate =0.5$且不可更改。