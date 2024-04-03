import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email:string;
    
    @IsNotEmpty()
    @IsString()
    @Length(5,20,{message:'Password should be between:5 to 20 chars'})
    public password:string;

}