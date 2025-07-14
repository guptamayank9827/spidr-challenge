import React, {useState, ChangeEvent} from 'react'
import { FormControl, FormLabel, TextField } from "@mui/material";

interface FormatInputProps {
    id: string;
    name?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    formatDisplay: (value: string) => string;
    error?: boolean;
    errorMessage?: string;
    inputLength?: number; // Optional prop to specify the length of the input
}

function FormatInput({ id="id", name="name", placeholder="Enter 16 digits", error=false, errorMessage="", inputLength=16, onValueChange, formatDisplay }: FormatInputProps) {
    const [actualValue, setActualValue] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>('');

    const FORMATTING_CHARACTERS = ['-', ' ', '(', ')'];

    const displayPositionToActual = (displayPos: number): number => {
        let actualPos = 0;
        let displayCount = 0;
        
        for (let i = 0; i < displayValue.length && displayCount < displayPos; i++) {
            if (FORMATTING_CHARACTERS.includes(displayValue[i])) {
                displayCount++;
            }
            else {
                actualPos++;
                displayCount++;
            }
        }
        
        return actualPos;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        
        // Only allow digits
        const cleanInput = inputValue.replace(/[^0-9]/g, '').slice(0, inputLength);

        setActualValue(cleanInput);
        setDisplayValue(formatDisplay(cleanInput));
        
        if(onValueChange)  onValueChange(cleanInput);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const selectionStart = target.selectionStart || 0;
        const selectionEnd = target.selectionEnd || 0;
        
        // Handle backspace and delete
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();
            
            if (actualValue.length > 0) {
                let newActualValue = actualValue;
                
                if (selectionStart !== selectionEnd) {
                    // Handle selection deletion
                    const startPos = displayPositionToActual(selectionStart);
                    const endPos = displayPositionToActual(selectionEnd);
                    
                    newActualValue = actualValue.slice(0, startPos) + actualValue.slice(endPos);
                }
                else {
                    // Handle single character deletion
                    const actualPos = displayPositionToActual(selectionStart);
                    
                    if (event.key === 'Backspace' && actualPos > 0) {
                        // Remove character before cursor
                        newActualValue = actualValue.slice(0, actualPos - 1) + actualValue.slice(actualPos);
                    }
                    else if (event.key === 'Delete' && actualPos < actualValue.length) {
                        // Remove character at cursor
                        newActualValue = actualValue.slice(0, actualPos) + actualValue.slice(actualPos + 1);
                    }
                }

                setActualValue(newActualValue);
                setDisplayValue(formatDisplay(newActualValue));
                
                if(onValueChange)  onValueChange(newActualValue);
            }
            return;
        }
        
        // Handle regular character input (digits only)
        if (actualValue.length < inputLength) {
            const char = event.key;
            if (/[0-9]/.test(char)) {
                event.preventDefault();
                
                const actualPos = displayPositionToActual(selectionStart);
                const newActualValue = actualValue.slice(0, actualPos) + char + actualValue.slice(actualPos);
                
                setActualValue(newActualValue);
                setDisplayValue(formatDisplay(newActualValue));
                
                if(onValueChange)  onValueChange(newActualValue);
            }
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();

        const pastedText = event.clipboardData.getData('text');
        const cleanInput = pastedText.replace(/[^0-9]/g, '').slice(0, inputLength);

        setActualValue(cleanInput);
        setDisplayValue(formatDisplay(cleanInput));
        
        if(onValueChange)  onValueChange(cleanInput);
    };

    return(
        <FormControl>
            <FormLabel htmlFor={id}>{name}</FormLabel>
            <TextField
                id={id}
                name={id}
                type='text'
                fullWidth
                variant="outlined"
                placeholder={placeholder}
                value={displayValue}
                error={error}
                helperText={errorMessage}

                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
            />
        </FormControl>
    );

};

export default FormatInput;