---
layout: post
title: NPOI单元格颜色对照表
category: 技术
tags: NPOI
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
<table style="width: 80%;text-align:center;background:#333;" border="0" cellspacing="1" cellpadding="1">
<tbody style="background:#fff;">
<tr class="firstRow" valign="bottom">
<td class="xl6311023" width="64" height="17">颜色</td>
<td class="xl6511023" width="204">Class名称</td>
</tr>
<tr valign="bottom">
<td class="xl6311023" bgcolor="#000000" width="64" height="17">　</td>
<td class="xl6511023" width="204">Black</td>
</tr>
<tr valign="bottom">
<td class="xl6611023" bgcolor="#993300" height="17">　</td>
<td class="xl6511023">Brown</td>
</tr>
<tr valign="bottom">
<td class="xl6811023" bgcolor="#333300" height="17">　</td>
<td class="xl6511023">Olive_Green</td>
</tr>
<tr valign="bottom">
<td class="xl7011023" bgcolor="#003300" height="17">　</td>
<td class="xl6511023">Dark_Green</td>
</tr>
<tr valign="bottom">
<td class="xl7211023" bgcolor="#003366" height="17">　</td>
<td class="xl6511023">Dark_Teal</td>
</tr>
<tr valign="bottom">
<td class="xl7411023" bgcolor="#000080" height="17">　</td>
<td class="xl6511023">Dark_Blue</td>
</tr>
<tr valign="bottom">
<td class="xl7611023" bgcolor="#333399" height="17">　</td>
<td class="xl6511023">Indigo</td>
</tr>
<tr valign="bottom">
<td class="xl7811023" bgcolor="#333333" height="17">　</td>
<td class="xl6511023">Grey_80_PERCENT</td>
</tr>
<tr valign="bottom">
<td class="xl8011023" bgcolor="#800000" height="17">　</td>
<td class="xl6511023">Dark_Red</td>
</tr>
<tr valign="bottom">
<td class="xl8211023" bgcolor="#ff6600" height="17">　</td>
<td class="xl6511023">Orange</td>
</tr>
<tr valign="bottom">
<td class="xl8411023" bgcolor="#808000" height="17">　</td>
<td class="xl6511023">DARK_YELLOW</td>
</tr>
<tr valign="bottom">
<td class="xl8611023" bgcolor="#008000" height="17">　</td>
<td class="xl6511023">Green</td>
</tr>
<tr valign="bottom">
<td class="xl8811023" bgcolor="#008080" height="17">　</td>
<td class="xl6511023">Teal</td>
</tr>
<tr valign="bottom">
<td class="xl9011023" bgcolor="#0000ff" height="17">　</td>
<td class="xl6511023">Blue</td>
</tr>
<tr valign="bottom">
<td class="xl9211023" bgcolor="#666699" height="17">　</td>
<td class="xl6511023">Blue_Grey</td>
</tr>
<tr valign="bottom">
<td class="xl9411023" bgcolor="#808080" height="17">　</td>
<td class="xl6511023">Grey_50_PERCENT</td>
</tr>
<tr valign="bottom">
<td class="xl9611023" bgcolor="#ff0000" height="17">　</td>
<td class="xl6511023">Red</td>
</tr>
<tr valign="bottom">
<td class="xl9811023" bgcolor="#ff9900" height="17">　</td>
<td class="xl6511023">LIGHT_ORANGE</td>
</tr>
<tr valign="bottom">
<td class="xl10011023" bgcolor="#99cc00" height="17">　</td>
<td class="xl6511023">LIME</td>
</tr>
<tr valign="bottom">
<td class="xl10211023" bgcolor="#339966" height="17">　</td>
<td class="xl6511023">SEA_GREEN</td>
</tr>
<tr valign="bottom">
<td class="xl10411023" bgcolor="#33cccc" height="17">　</td>
<td class="xl6511023">AQUA</td>
</tr>
<tr valign="bottom">
<td class="xl10611023" bgcolor="#3366ff" height="17">　</td>
<td class="xl6511023">LIGHT_BLUE</td>
</tr>
<tr valign="bottom">
<td class="xl10811023" bgcolor="#800080" height="17">　</td>
<td class="xl6511023">VIOLET</td>
</tr>
<tr valign="bottom">
<td class="xl11011023" bgcolor="#969696" height="17">　</td>
<td class="xl6511023">GREY_40_PERCENT</td>
</tr>
<tr valign="bottom">
<td class="xl11211023" bgcolor="#ff00ff" height="17">　</td>
<td class="xl6511023">Pink</td>
</tr>
<tr valign="bottom">
<td class="xl11411023" bgcolor="#ffcc00" height="17">　</td>
<td class="xl6511023">Gold</td>
</tr>
<tr valign="bottom">
<td class="xl11611023" bgcolor="#ffff00" height="17">　</td>
<td class="xl6511023">Yellow</td>
</tr>
<tr valign="bottom">
<td class="xl11811023" bgcolor="#00ff00" height="17">　</td>
<td class="xl6511023">BRIGHT_GREEN</td>
</tr>
<tr valign="bottom">
<td class="xl12011023" bgcolor="#00ffff" height="17">　</td>
<td class="xl6511023">TURQUOISE</td>
</tr>
<tr valign="bottom">
<td class="xl12211023" bgcolor="#00ccff" height="17">　</td>
<td class="xl6511023">SKY_BLUE</td>
</tr>
<tr valign="bottom">
<td class="xl12411023" bgcolor="#993366" height="17">　</td>
<td class="xl6511023">Plum</td>
</tr>
<tr valign="bottom">
<td class="xl12611023" bgcolor="#c0c0c0" height="17">　</td>
<td class="xl6511023">GREY_25_PERCENT</td>
</tr>
<tr valign="bottom">
<td class="xl12811023" bgcolor="#ff99cc" height="17">　</td>
<td class="xl6511023">Rose</td>
</tr>
<tr valign="bottom">
<td class="xl13011023" bgcolor="#ffcc99" height="17">　</td>
<td class="xl6511023">Tan</td>
</tr>
<tr valign="bottom">
<td class="xl13211023" bgcolor="#ffff99" height="17">　</td>
<td class="xl6511023">LIGHT_YELLOW</td>
</tr>
<tr valign="bottom">
<td class="xl13411023" bgcolor="#ccffcc" height="17">　</td>
<td class="xl6511023">LIGHT_GREEN</td>
</tr>
<tr valign="bottom">
<td class="xl13611023" bgcolor="#ccffff" height="17">　</td>
<td class="xl6511023">LIGHT_TURQUOISE</td>
</tr>
<tr valign="bottom">
<td class="xl13811023" bgcolor="#99ccff" height="17">　</td>
<td class="xl6511023">PALE_BLUE</td>
</tr>
<tr valign="bottom">
<td class="xl14011023" bgcolor="#cc99ff" height="17">　</td>
<td class="xl6511023">LAVENDER</td>
</tr>
<tr valign="bottom">
<td class="xl14211023" bgcolor="#ffffff" height="17">　</td>
<td class="xl6511023">White</td>
</tr>
<tr valign="bottom">
<td class="xl14411023" bgcolor="#9999ff" height="17">　</td>
<td class="xl6511023">CORNFLOWER_BLUE</td>
</tr>
<tr valign="bottom">
<td class="xl14611023" bgcolor="#ffffcc" height="17">　</td>
<td class="xl6511023">LEMON_CHIFFON</td>
</tr>
<tr valign="bottom">
<td class="xl14811023" bgcolor="#993366" height="17">　</td>
<td class="xl6511023">MAROON</td>
</tr>
<tr valign="bottom">
<td class="xl15011023" bgcolor="#660066" height="17">　</td>
<td class="xl6511023">ORCHID</td>
</tr>
<tr valign="bottom">
<td class="xl15211023" bgcolor="#ff8080" height="17">　</td>
<td class="xl6511023">CORAL</td>
</tr>
<tr valign="bottom">
<td class="xl15411023" bgcolor="#0066cc" height="17">　</td>
<td class="xl6511023">ROYAL_BLUE</td>
</tr>
<tr valign="bottom">
<td class="xl15611023" bgcolor="#ccccff" height="17">　</td>
<td class="xl6511023">LIGHT_CORNFLOWER_BLUE</td>
</tr>
<tr valign="bottom">
<td class="xl15811023" height="17">　</td>
<td class="xl6511023">AUTOMATIC</td>
</tr>
</tbody>
</table>