---
layout: post
title: NPOI单元格颜色对照表
category: 技术
---
{{ page.title }}
===
> 本文记录使用NPOI操作Excel时，设置单元格背景色的值。
{% highlight c# %}
ICellStyle style = workbook.CreateCellStyle();
style.FillForegroundColor = NPOI.HSSF.Util.HSSFColor.Red.Index;
style.FillPattern = FillPattern.SolidForeground;
 
ICell cell = workbook.CreateSheet().CreateRow(0).CreateCell(0);
cell.CellStyle = style;
{% endhighlight %}
<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr class="firstRow" valign="bottom">
<td class="xl6311023" width="64" height="17">颜色</td>
<td class="xl6411023" width="64">测试</td>
<td class="xl6511023" width="204">Class名称</td>
<td class="xl6511023" width="64">short</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr valign="bottom">
<td class="xl6311023" bgcolor="#000000" width="64" height="17">　</td>
<td class="xl6411023" width="64">Test颜色</td>
<td class="xl6511023" width="204">Black</td>
<td class="xl6511023" width="64">8</td>
</tr>
<tr valign="bottom">
<td class="xl6611023" bgcolor="#993300" height="17">　</td>
<td class="xl6711023">Test颜色</td>
<td class="xl6511023">Brown</td>
<td class="xl6511023">60</td>
</tr>
<tr valign="bottom">
<td class="xl6811023" bgcolor="#333300" height="17">　</td>
<td class="xl6911023">Test颜色</td>
<td class="xl6511023">Olive_Green</td>
<td class="xl6511023">59</td>
</tr>
<tr valign="bottom">
<td class="xl7011023" bgcolor="#003300" height="17">　</td>
<td class="xl7111023">Test颜色</td>
<td class="xl6511023">Dark_Green</td>
<td class="xl6511023">58</td>
</tr>
<tr valign="bottom">
<td class="xl7211023" bgcolor="#003366" height="17">　</td>
<td class="xl7311023">Test颜色</td>
<td class="xl6511023">Dark_Teal</td>
<td class="xl6511023">56</td>
</tr>
<tr valign="bottom">
<td class="xl7411023" bgcolor="#000080" height="17">　</td>
<td class="xl7511023">Test颜色</td>
<td class="xl6511023">Dark_Blue</td>
<td class="xl6511023">18</td>
</tr>
<tr valign="bottom">
<td class="xl7611023" bgcolor="#333399" height="17">　</td>
<td class="xl7711023">Test颜色</td>
<td class="xl6511023">Indigo</td>
<td class="xl6511023">62</td>
</tr>
<tr valign="bottom">
<td class="xl7811023" bgcolor="#333333" height="17">　</td>
<td class="xl7911023">Test颜色</td>
<td class="xl6511023">Grey_80_PERCENT</td>
<td class="xl6511023">63</td>
</tr>
<tr valign="bottom">
<td class="xl8011023" bgcolor="#800000" height="17">　</td>
<td class="xl8111023">Test颜色</td>
<td class="xl6511023">Dark_Red</td>
<td class="xl6511023">16</td>
</tr>
<tr valign="bottom">
<td class="xl8211023" bgcolor="#ff6600" height="17">　</td>
<td class="xl8311023">Test颜色</td>
<td class="xl6511023">Orange</td>
<td class="xl6511023">53</td>
</tr>
<tr valign="bottom">
<td class="xl8411023" bgcolor="#808000" height="17">　</td>
<td class="xl8511023">Test颜色</td>
<td class="xl6511023">DARK_YELLOW</td>
<td class="xl6511023">19</td>
</tr>
<tr valign="bottom">
<td class="xl8611023" bgcolor="#008000" height="17">　</td>
<td class="xl8711023">Test颜色</td>
<td class="xl6511023">Green</td>
<td class="xl6511023">17</td>
</tr>
<tr valign="bottom">
<td class="xl8811023" bgcolor="#008080" height="17">　</td>
<td class="xl8911023">Test颜色</td>
<td class="xl6511023">Teal</td>
<td class="xl6511023">21</td>
</tr>
<tr valign="bottom">
<td class="xl9011023" bgcolor="#0000ff" height="17">　</td>
<td class="xl9111023">Test颜色</td>
<td class="xl6511023">Blue</td>
<td class="xl6511023">12</td>
</tr>
<tr valign="bottom">
<td class="xl9211023" bgcolor="#666699" height="17">　</td>
<td class="xl9311023">Test颜色</td>
<td class="xl6511023">Blue_Grey</td>
<td class="xl6511023">54</td>
</tr>
<tr valign="bottom">
<td class="xl9411023" bgcolor="#808080" height="17">　</td>
<td class="xl9511023">Test颜色</td>
<td class="xl6511023">Grey_50_PERCENT</td>
<td class="xl6511023">23</td>
</tr>
<tr valign="bottom">
<td class="xl9611023" bgcolor="#ff0000" height="17">　</td>
<td class="xl9711023">Test颜色</td>
<td class="xl6511023">Red</td>
<td class="xl6511023">10</td>
</tr>
<tr valign="bottom">
<td class="xl9811023" bgcolor="#ff9900" height="17">　</td>
<td class="xl9911023">Test颜色</td>
<td class="xl6511023">LIGHT_ORANGE</td>
<td class="xl6511023">52</td>
</tr>
<tr valign="bottom">
<td class="xl10011023" bgcolor="#99cc00" height="17">　</td>
<td class="xl10111023">Test颜色</td>
<td class="xl6511023">LIME</td>
<td class="xl6511023">50</td>
</tr>
<tr valign="bottom">
<td class="xl10211023" bgcolor="#339966" height="17">　</td>
<td class="xl10311023">Test颜色</td>
<td class="xl6511023">SEA_GREEN</td>
<td class="xl6511023">57</td>
</tr>
<tr valign="bottom">
<td class="xl10411023" bgcolor="#33cccc" height="17">　</td>
<td class="xl10511023">Test颜色</td>
<td class="xl6511023">AQUA</td>
<td class="xl6511023">49</td>
</tr>
<tr valign="bottom">
<td class="xl10611023" bgcolor="#3366ff" height="17">　</td>
<td class="xl10711023">Test颜色</td>
<td class="xl6511023">LIGHT_BLUE</td>
<td class="xl6511023">48</td>
</tr>
<tr valign="bottom">
<td class="xl10811023" bgcolor="#800080" height="17">　</td>
<td class="xl10911023">Test颜色</td>
<td class="xl6511023">VIOLET</td>
<td class="xl6511023">20</td>
</tr>
<tr valign="bottom">
<td class="xl11011023" bgcolor="#969696" height="17">　</td>
<td class="xl11111023">Test颜色</td>
<td class="xl6511023">GREY_40_PERCENT</td>
<td class="xl6511023">55</td>
</tr>
<tr valign="bottom">
<td class="xl11211023" bgcolor="#ff00ff" height="17">　</td>
<td class="xl11311023">Test颜色</td>
<td class="xl6511023">Pink</td>
<td class="xl6511023">14</td>
</tr>
<tr valign="bottom">
<td class="xl11411023" bgcolor="#ffcc00" height="17">　</td>
<td class="xl11511023">Test颜色</td>
<td class="xl6511023">Gold</td>
<td class="xl6511023">51</td>
</tr>
<tr valign="bottom">
<td class="xl11611023" bgcolor="#ffff00" height="17">　</td>
<td class="xl11711023">Test颜色</td>
<td class="xl6511023">Yellow</td>
<td class="xl6511023">13</td>
</tr>
<tr valign="bottom">
<td class="xl11811023" bgcolor="#00ff00" height="17">　</td>
<td class="xl11911023">Test颜色</td>
<td class="xl6511023">BRIGHT_GREEN</td>
<td class="xl6511023">11</td>
</tr>
<tr valign="bottom">
<td class="xl12011023" bgcolor="#00ffff" height="17">　</td>
<td class="xl12111023">Test颜色</td>
<td class="xl6511023">TURQUOISE</td>
<td class="xl6511023">15</td>
</tr>
<tr valign="bottom">
<td class="xl12211023" bgcolor="#00ccff" height="17">　</td>
<td class="xl12311023">Test颜色</td>
<td class="xl6511023">SKY_BLUE</td>
<td class="xl6511023">40</td>
</tr>
<tr valign="bottom">
<td class="xl12411023" bgcolor="#993366" height="17">　</td>
<td class="xl12511023">Test颜色</td>
<td class="xl6511023">Plum</td>
<td class="xl6511023">61</td>
</tr>
<tr valign="bottom">
<td class="xl12611023" bgcolor="#c0c0c0" height="17">　</td>
<td class="xl12711023">Test颜色</td>
<td class="xl6511023">GREY_25_PERCENT</td>
<td class="xl6511023">22</td>
</tr>
<tr valign="bottom">
<td class="xl12811023" bgcolor="#ff99cc" height="17">　</td>
<td class="xl12911023">Test颜色</td>
<td class="xl6511023">Rose</td>
<td class="xl6511023">45</td>
</tr>
<tr valign="bottom">
<td class="xl13011023" bgcolor="#ffcc99" height="17">　</td>
<td class="xl13111023">Test颜色</td>
<td class="xl6511023">Tan</td>
<td class="xl6511023">47</td>
</tr>
<tr valign="bottom">
<td class="xl13211023" bgcolor="#ffff99" height="17">　</td>
<td class="xl13311023">Test颜色</td>
<td class="xl6511023">LIGHT_YELLOW</td>
<td class="xl6511023">43</td>
</tr>
<tr valign="bottom">
<td class="xl13411023" bgcolor="#ccffcc" height="17">　</td>
<td class="xl13511023">Test颜色</td>
<td class="xl6511023">LIGHT_GREEN</td>
<td class="xl6511023">42</td>
</tr>
<tr valign="bottom">
<td class="xl13611023" bgcolor="#ccffff" height="17">　</td>
<td class="xl13711023">Test颜色</td>
<td class="xl6511023">LIGHT_TURQUOISE</td>
<td class="xl6511023">41</td>
</tr>
<tr valign="bottom">
<td class="xl13811023" bgcolor="#99ccff" height="17">　</td>
<td class="xl13911023">Test颜色</td>
<td class="xl6511023">PALE_BLUE</td>
<td class="xl6511023">44</td>
</tr>
<tr valign="bottom">
<td class="xl14011023" bgcolor="#cc99ff" height="17">　</td>
<td class="xl14111023">Test颜色</td>
<td class="xl6511023">LAVENDER</td>
<td class="xl6511023">46</td>
</tr>
<tr valign="bottom">
<td class="xl14211023" bgcolor="#ffffff" height="17">　</td>
<td class="xl14311023">Test颜色</td>
<td class="xl6511023">White</td>
<td class="xl6511023">9</td>
</tr>
<tr valign="bottom">
<td class="xl14411023" bgcolor="#9999ff" height="17">　</td>
<td class="xl14511023">Test颜色</td>
<td class="xl6511023">CORNFLOWER_BLUE</td>
<td class="xl6511023">24</td>
</tr>
<tr valign="bottom">
<td class="xl14611023" bgcolor="#ffffcc" height="17">　</td>
<td class="xl14711023">Test颜色</td>
<td class="xl6511023">LEMON_CHIFFON</td>
<td class="xl6511023">26</td>
</tr>
<tr valign="bottom">
<td class="xl14811023" bgcolor="#993366" height="17">　</td>
<td class="xl14911023">Test颜色</td>
<td class="xl6511023">MAROON</td>
<td class="xl6511023">25</td>
</tr>
<tr valign="bottom">
<td class="xl15011023" bgcolor="#660066" height="17">　</td>
<td class="xl15111023">Test颜色</td>
<td class="xl6511023">ORCHID</td>
<td class="xl6511023">28</td>
</tr>
<tr valign="bottom">
<td class="xl15211023" bgcolor="#ff8080" height="17">　</td>
<td class="xl15311023">Test颜色</td>
<td class="xl6511023">CORAL</td>
<td class="xl6511023">29</td>
</tr>
<tr valign="bottom">
<td class="xl15411023" bgcolor="#0066cc" height="17">　</td>
<td class="xl15511023">Test颜色</td>
<td class="xl6511023">ROYAL_BLUE</td>
<td class="xl6511023">30</td>
</tr>
<tr valign="bottom">
<td class="xl15611023" bgcolor="#ccccff" height="17">　</td>
<td class="xl15711023">Test颜色</td>
<td class="xl6511023">LIGHT_CORNFLOWER_BLUE</td>
<td class="xl6511023">31</td>
</tr>
<tr valign="bottom">
<td class="xl15811023" height="17">　</td>
<td class="xl15911023">Test颜色</td>
<td class="xl6511023">AUTOMATIC</td>
<td class="xl6511023">64</td>
</tr>
</tbody>
</table>