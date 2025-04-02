import os
import random
import string

import json




random.seed(20)



def random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def scramble_string(s, scramble_count):
    if len(s) <= 1:
        return s  # Nothing to scramble if string is empty or has 1 character
    
    # Convert to list since strings are immutable
    chars = list(s)
    
    for _ in range(scramble_count):
        # We'll only operate on characters after the first one
        working_chars = chars[1:]
        
        # Randomly choose an operation
        operation = random.randint(0, 1)
        
        if operation == 0:  # Add a new random letter
            pos = random.randint(0, len(working_chars))
            new_char = chr(random.randint(97, 122))  # lowercase a-z
            working_chars.insert(pos, new_char)
        
        else:  # Switch two letters
            if len(working_chars) >= 2:  # need at least 2 letters to switch
                pos1, pos2 = random.sample(range(len(working_chars)), 2)
                working_chars[pos1], working_chars[pos2] = working_chars[pos2], working_chars[pos1]
        
        # Rebuild the character list with first character + modified portion
        chars = [chars[0]] + working_chars
    
    return (''.join(chars).lower()).encode('ascii', 'ignore').decode('ascii')

file_path = os.path.join(os.path.dirname(__file__), "vardi.txt")



with open(file_path, "r", encoding="utf-8") as f:
    lines=f.readlines()



result={"iii":{"vok":"Test", "gen":"Testa"}}

for l in lines:

    l=l.strip()

    parts=l.split(":")
    vok=parts[0]
    gen=vok
    
    for c in parts[1]:
        if c=='-':
            gen=gen[:-1]
        else:
            gen+=c
    
    result[scramble_string(vok, 5)]={"vok":vok, "gen":gen}



print(result)

with open(os.path.join(os.path.dirname(__file__), "vardi.json"), 'w') as json_file:
    json.dump(result, json_file)