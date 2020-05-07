# Random Passphrase Generator
# Opens csv list containing 2 lists of adjectives and 1 list of nouns
# Add numeral and special character if required for password policy
# Inspired by XKCD: https://xkcd.com/936/
# Author: Rory MacLysaght rorylysaght(at)gmail(dot)com

import random

list_a = []
list_b = []
list_c = []
list_d = ['!','@','#','$','%','^','&','*','(',')','_','-','+','=','?','~']

# Open our CSV file containing 3 words per line, and split on comma
with open('pass_list.csv', 'r') as f:
	for line in f:
		words = line.split(',')
		list_a.append(words[0])
		list_b.append(words[1])
		list_c.append(words[2].strip()) # remove newline character from end of string

#		while res:= input("Do you want to save? (Enter y/n)").lower() not in {"y", "n"}: pass

def genPass():
	reply = ''
	while reply not in {'1', '2', '3'}:
		print('For letters only, type 1\nTo add numbers, type 2\nTo add Special Characters, type 3')
		reply = input('? ')
		a = random.choice(list_a)
		b = random.choice(list_b)
		c = random.choice(list_c)
		d = random.choice(list_d)

	# Make each word begin with Capital
	a = a.title()
	b = b.title()
	c = c.title()

	print('### Your New Passphrase: ###\n')
	if reply == '1': # letters only
		print(a+b+c)
	elif reply == '2': # numbers
		print(a+b+c+str(random.randint(0, 9)))
	else:
		print(a+b+c+d+str(random.randint(0, 9))) # special chars
	print('\n')

while True:
    try:
        input('Hit Return to generate Fresh Passphrase ')
        genPass()
    except KeyboardInterrupt:
        break

print("Thanks")

# Close our input file
f.close()
