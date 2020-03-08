import re
import bml
import xml.etree.ElementTree as ET
import random
import string


def html_bidtable(et_element, children):
    if len(children) > 0:
        # ET.SubElement(et_element,'br')
        bt = ET.SubElement(et_element, 'a')
        el_id = ''.join(random.choices(string.ascii_letters, k=8))
        bt.attrib['onclick'] = f"show_hide_bid('{el_id}')"
        bt.text = 'Click'
        bt.attrib['class'] = 'button'
        ul = ET.SubElement(et_element, 'div')
        ul.attrib['class'] = 'ul'
        ul.attrib['style'] = 'display: none'
        ul.attrib['id'] = el_id
        for c in children:
            li = ET.SubElement(ul, 'div')
            li.attrib['class'] = 'li'
            div = ET.SubElement(li, 'span')
            div.attrib['class'] = 'start'
            desc_rows = c.desc.split('\\n')
            bid = re.sub(r'^P$', 'Pas', c.bid)
            bid = re.sub(r'^R$', 'XX', bid)
            bid = re.sub(r'^D$', 'X', bid)
            div.text = bid
            div.tail = desc_rows[0]
            desc_rows = desc_rows[1:]
            for dr in desc_rows:
                rowli = ET.SubElement(ul, 'div')
                rowli.attrib['class'] = 'li'
                rowdiv = ET.SubElement(rowli, 'span')
                rowdiv.attrib['class'] = 'start'
                rowdiv.text = '-'
                rowdiv.tail = dr
            html_bidtable(li, c.children)


def html_replace_suits(matchobj):
    text = matchobj.group(0)
    text = text.replace('C', '<span class="ccolor">&clubs;</span>')
    text = text.replace('D', '<span class="dcolor">&diams;</span>')
    text = text.replace('H', '<span class="hcolor">&hearts;</span>')
    text = text.replace('S', '<span class="scolor">&spades;</span>')
    text = text.replace('N', 'NT')
    return text


def replace_strong(matchobj):
    return '<strong>' + matchobj.group(1) + '</strong>'


def replace_italics(matchobj):
    return '<em>' + matchobj.group(1) + '</em>'


def replace_truetype(matchobj):
    return '<code>' + matchobj.group(1) + '</code>'


def to_html(content):
    html = ET.Element('html')
    head = ET.SubElement(html, 'head')
    link = ET.SubElement(head, 'link')
    link.attrib['rel'] = 'stylesheet'
    link.attrib['type'] = 'text/css'
    link.attrib['href'] = 'https://bridge-team-webpage-bucket.s3-eu-west-1.amazonaws.com/bml.css'
    # link.attrib['href'] = 'bml.css'
    body = ET.SubElement(html, 'body')
    script = ET.SubElement(html, 'script')
    script.text = """
    function show_hide_bid(element) {
  var x = document.getElementById(element);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}"""

    for c in content:
        content_type, text = c
        if content_type == bml.ContentType.PARAGRAPH:
            element = ET.SubElement(body, 'p')
            element.text = text
        elif content_type == bml.ContentType.BIDTABLE:
            if not text.export:
                continue
            element = ET.SubElement(body, 'div')
            element.attrib['class'] = 'bidtable'
            html_bidtable(element, text.children)
        elif content_type == bml.ContentType.H1:
            element = ET.SubElement(body, 'h1')
            element.text = text
        elif content_type == bml.ContentType.H2:
            element = ET.SubElement(body, 'h2')
            element.text = text
        elif content_type == bml.ContentType.H3:
            element = ET.SubElement(body, 'h3')
            element.text = text
        elif content_type == bml.ContentType.H4:
            element = ET.SubElement(body, 'h4')
            element.text = text
        elif content_type == bml.ContentType.LIST:
            element = ET.SubElement(body, 'ul')
            for l in text:
                li = ET.SubElement(element, 'li')
                li.text = l
        elif content_type == bml.ContentType.ENUM:
            element = ET.SubElement(body, 'ol')
            for l in text:
                li = ET.SubElement(element, 'li')
                li.text = l

    title = ET.SubElement(head, 'title')
    title.text = bml.meta['TITLE']

    htmlstring = str(ET.tostring(html), 'UTF8')

    htmlstring = re.sub(r'(?<=\s)\*(\S[^*<>]*)\*', replace_strong, htmlstring, flags=re.DOTALL)
    htmlstring = re.sub(r'(?<=\s)/(\S[^/<>]*)/', replace_italics, htmlstring, flags=re.DOTALL)
    # htmlstring = re.sub(r'(?<=\s)=(\S[^=<>]*)=', replace_truetype, htmlstring, flags=re.DOTALL)

    # Replaces !c!d!h!s with suit symbols
    htmlstring = htmlstring.replace('!c', '<span class="ccolor">&clubs;</span>')
    htmlstring = htmlstring.replace('!d', '<span class="dcolor">&diams;</span>')
    htmlstring = htmlstring.replace('!h', '<span class="hcolor">&hearts;</span>')
    htmlstring = htmlstring.replace('!s', '<span class="scolor">&spades;</span>')

    # Replace "long dashes"
    htmlstring = htmlstring.replace('---', '&mdash;')
    htmlstring = htmlstring.replace('--', '&ndash;')

    htmlstring = re.sub(r'\d([CDHS]|N(?!T))+', html_replace_suits, htmlstring)
    htmlstring = '<!doctype html>' + htmlstring

    return htmlstring


if __name__ == '__main__':
    import sys
    import os

    outputfile = ''
    if len(sys.argv) < 2:
        print("What's the name of the file you want to convert?")
        outputfile = input()
        if not os.path.exists(outputfile):
            sys.exit('ERROR: File %s was not found!' % outputfile)
        bml.content_from_file(outputfile)
        outputfile = outputfile.split('.')[0]
    else:
        if not os.path.exists(sys.argv[1]):
            sys.exit('ERROR: File %s was not found!' % sys.argv[1])

        bml.content_from_file(sys.argv[1])
        outputfile = os.path.basename(sys.argv[1]).split('.')[0]

    h = to_html(bml.content)
    f = open(outputfile + '.html', 'w')
    f.write(h)
    f.close()
