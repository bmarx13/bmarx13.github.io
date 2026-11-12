from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.lib.pagesizes import A4
out='assets/bret-dumaraos-resume.pdf'
w,h=A4
c=canvas.Canvas(out,pagesize=A4)
c.setTitle('Bret Michael Dumaraos - Professional Resume')
c.setAuthor('Bret Michael Dumaraos')
ink=HexColor('#252722');muted=HexColor('#53584d');olive=HexColor('#5c6845')
c.setFillColor(HexColor('#f7f6f1'));c.rect(0,0,w,h,fill=1,stroke=0)
x=48;y=h-52
c.setFillColor(olive);c.setFont('Helvetica-Bold',9);c.drawString(x,y,'DEVELOPMENT / SECURITY / SYSTEMS');y-=33
c.setFillColor(ink);c.setFont('Helvetica-Bold',25);c.drawString(x,y,'Bret Michael Dumaraos');y-=24
c.setFont('Helvetica',12);c.drawString(x,y,'Lead DevSecOps Developer | Systems Administrator');y-=21
c.setFont('Helvetica',10);c.setFillColor(muted);c.drawString(x,y,'bret.dumaraos@caap.gov.ph');c.linkURL('mailto:bret.dumaraos@caap.gov.ph',(x,y-2,x+215,y+10));y-=27

def section(title):
 global y
 c.setStrokeColor(HexColor('#d3d7c9'));c.line(x,y,w-x,y);y-=21
 c.setFillColor(olive);c.setFont('Helvetica-Bold',9);c.drawString(x,y,title.upper());y-=21

def text(value,size=10,leading=15):
 global y
 c.setFillColor(muted);c.setFont('Helvetica',size)
 for line in simpleSplit(value,'Helvetica',size,w-2*x):
  c.drawString(x,y,line);y-=leading

def heading(value):
 global y
 c.setFillColor(ink);c.setFont('Helvetica-Bold',11);c.drawString(x,y,value);y-=17

section('Professional profile')
text('Information Technology I at the Civil Aviation Authority of the Philippines, working across development, systems administration, and cybersecurity. Builds digital platforms and the infrastructure supporting aviation services.')
y-=12
section('Current position')
heading('Information Technology I')
text('Civil Aviation Authority of the Philippines')
text('Job role: Lead DevSecOps Developer and Systems Administrator')
y-=12
section('Selected development portfolio')
for title,description in [
 ('CAAP Corporate Website','A public-facing gateway to aviation information, services, and resources.'),
 ('OFSAM Appointment Portal','An online experience for scheduling Airmen Medical Examinations.'),
 ('CAAP Project Monitoring','A workspace for tracking projects through planning and implementation.'),
 ('CAAP Online Payment System','A digital payment experience for CAAP fees and Order of Payment slips.')]:
 heading(title);text(description);y-=3
y-=3
section('Credentials and professional training')
for credential in [
 'SEC504: Hacker Tools, Techniques, and Incident Handling',
 'Industrial Control System (ICS) Cybersecurity Lab (301L)',
 'CompTIA Security+',
 'Python Programming Essentials',
 'PHP Programming']:
 text(credential,10,17)
 provider={'SEC504: Hacker Tools, Techniques, and Incident Handling':'SANS Institute','Industrial Control System (ICS) Cybersecurity Lab (301L)':'CISA','CompTIA Security+':'Tainocate','Python Programming Essentials':'DICT'}.get(credential)
 if provider: text(provider,9,16)
y-=10
section('Technical focus')
text('DevSecOps | Systems administration | Incident handling | ICS cybersecurity')
text('Python | PHP | Automation | CI/CD pipelines | System hardening')
assert y>35, f'Content overflow: {y}'
c.save()
print(out, 'created; final content baseline:', y)
