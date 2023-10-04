import { iButtonProps } from "@/interfaces";

const Button = ({text = '', variant, className = '', onClick = () => {}, disabled = false} : iButtonProps) => {
    return (
        <button 
            className={[variant, className].join(' ')} 
            onClick={onClick} 
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;