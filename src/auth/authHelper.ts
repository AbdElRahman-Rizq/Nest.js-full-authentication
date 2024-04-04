import * as bcrypt from 'bcrypt';


// Function for hashing passwords
export async function hashingPassword(params: string) {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(params, saltOrRounds);
    return hashedPass;
}

// Function for comparing between the password with hashed password
export async function comparingPassword(args: { password: string; hashed: string }) {
    return await bcrypt.compare(args.password, args.hashed);
}


