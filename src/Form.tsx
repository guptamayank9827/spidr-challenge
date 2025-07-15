import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, InputAdornment, TextField, Typography } from '@mui/material';
import FormatInput from './FormatInput';

interface FormInputProps {
    theme: any; // Assuming you have a theme type defined
}


function Form({ theme }: FormInputProps) {
    // State Definitions
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const [pinError, setPinError] = useState(false);

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [amountErrorMessage, setAmountErrorMessage] = useState('');
    const [pinErrorMessage, setPinErrorMessage] = useState('');

    const [resetValues, setResetValues] = useState(false);

    useEffect(() => {
        if(resetValues) setResetValues(false);
    }, [resetValues]);


    // Handle Input Changes
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let firstNameValue = event.target.value;

        setFirstName(firstNameValue);
        if (firstNameValue.length < 1) {
            setFirstNameError(true);
            setFirstNameErrorMessage('First Name is required.');
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        }
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let lastNameValue = event.target.value;

        setLastName(lastNameValue);
        if (lastNameValue.length < 1) {
            setLastNameError(true);
            setLastNameErrorMessage('Last Name is required.');
        } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
        }
    };

    const handlePhoneNumberChange = (phoneNumberValue: string) => {
        setPhoneNumber(phoneNumberValue);

        if(!validPhoneNumber(phoneNumberValue)) {
            setPhoneNumberError(true);
            setPhoneNumberErrorMessage('Phone Number should be exactly 10 digits.');
        } else {
            setPhoneNumberError(false);
            setPhoneNumberErrorMessage('');
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let emailValue = event.target.value;

        setEmail(emailValue);
        if(!validEmailAddress(emailValue)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
        }
        else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let amountValue = event.target.value;
    
        setAmount(amountValue);
        if(!validAmount(amountValue)) {
            setAmountError(true);
            setAmountErrorMessage('Please enter a valid positive estimated amount.');
        } else {
            setAmountError(false);
            setAmountErrorMessage('');
        }
    }

    const handlePinChange = (pinValue:string) => {
        setPin(pinValue);

        if(!validPin(pinValue)) {
            setPinError(true);
            setPinErrorMessage('Please enter the 16 digit secret PIN.');
        } else {
            setPinError(false);
            setPinErrorMessage('');
        }
    }


    // Validation Functions
    const validPhoneNumber = (phoneNumber: string) => {
        // Check if the phone number is exactly 10 digits
        return /^\d{10}$/.test(phoneNumber);
    };

    const validEmailAddress = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validAmount = (amount: string) => {
        // Check if the amount is a valid number and greater than 0
        const amountValue = parseFloat(amount);
        return !isNaN(amountValue) && amountValue > 0;
    };

    const validPin = (pin: string) => {
        // Check if the pin is exactly 16 digits
        return /^\d{16}$/.test(pin);
    };


    // Format Display Functions
    const formatPhoneNumberDisplay = (phoneNumberValue: string):string => {
        // Remove any non-digit characters for processing
        const cleanValue = phoneNumberValue.replace(/[^0-9]/g, '');

        // If empty input, return empty string
        if (cleanValue.length === 0) return '';

        return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)} - ${cleanValue.slice(6)}`;
    }

    const formatPinDisplay = (pinValue: string): string => {        
        // Remove any non-digit characters for processing
        const cleanValue = pinValue.replace(/[^0-9]/g, '');

        // If empty input, return empty string
        if (cleanValue.length === 0) return '';
        
        // Create masked display with # symbols
        const masked = cleanValue
            .split('')
            .map(() => '#')
            .join('');

        return masked.match(/.{1,4}/g)?.join('-') || masked;
    };


    //Form Submission
    const validateFormInputs = () => {
        if(firstNameError || lastNameError || phoneNumberError || emailError || amountError || pinError)
            return false;

        if(!firstName || !lastName || !validPhoneNumber(phoneNumber) || !validEmailAddress(email) || !validAmount(amount) || !validPin(pin))
            return false;

        return true;
    }

    const resetToDefaults = () => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setAmount('');
        setPin('');

        setFirstNameError(false);
        setLastNameError(false);
        setPhoneNumberError(false);
        setEmailError(false);
        setAmountError(false);
        setPinError(false);

        setFirstNameErrorMessage('');
        setLastNameErrorMessage('');
        setPhoneNumberErrorMessage('');
        setEmailErrorMessage('');
        setAmountErrorMessage('');
        setPinErrorMessage('');

        setResetValues(true);
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!validateFormInputs()) {
            event.preventDefault();
            return;
        }

        console.log(`
            First Name: ${firstName}
            Last Name: ${lastName}
            Phone Number: ${phoneNumber}
            Email Address: ${email}
            Estimated Amount: ${amount}
            Secret Pin: ${pin}
        `);

        resetToDefaults();
    }


    return(
        <Box
            sx={{
                width: '100%',
                backgroundColor: theme.palette.background.default, // Use theme paper background color
                padding: { xs: 4, md: 5 }, // Equivalent to p-8 md:p-10
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 6,
                borderColor: theme.palette.primary.light
            }}
        >
            <Typography
                variant="h4"
                component="h4"
                align="center"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
            >
                Air Fryer
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                sx={{ color: theme.palette.text.primary }}
            >
                Fill out the details below to win a brand-new Air Fryer
            </Typography>

            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                    gap: 3,
                    mt: 4,
                    backgroundColor: theme.palette.background.default,
                }}
            >

                <FormControl>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <TextField
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        fullWidth
                        variant="outlined"
                        placeholder="John"
                        error={firstNameError}
                        helperText={firstNameErrorMessage}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <TextField
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        fullWidth
                        variant="outlined"
                        placeholder="Doe"
                        error={lastNameError}
                        helperText={lastNameErrorMessage}
                    />
                </FormControl>

                <FormatInput
                    id="phoneNumber"
                    name="Phone Number"
                    placeholder="(123) 456-7890"
                    onValueChange={handlePhoneNumberChange}
                    formatDisplay={formatPhoneNumberDisplay}
                    error={phoneNumberError}
                    errorMessage={phoneNumberErrorMessage}
                    inputLength={10}
                    resetValues={resetValues}
                />

                <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        variant="outlined"
                        placeholder="you@domain.com"
                        error={emailError}
                        helperText={emailErrorMessage}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="amount">Estimated Amount</FormLabel>
                    <TextField
                        id="amount"
                        name="amount"
                        value={amount}
                        type='number'
                        onChange={handleAmountChange}
                        fullWidth
                        variant="outlined"
                        placeholder="249.99"
                        error={amountError}
                        helperText={amountErrorMessage}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start" sx={{color:theme.palette.text.primary}}>$</InputAdornment>
                                )
                            }
                        }}
                        sx={{
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                display: 'none',
                            },
                            '& input[type=number]': {
                                MozAppearance: 'textfield',
                            }
                        }}
                    />
                </FormControl>

                <FormatInput
                    id="pin"
                    name="Secret PIN"
                    placeholder="####-####-####-####"
                    onValueChange={handlePinChange}
                    formatDisplay={formatPinDisplay}
                    error={pinError}
                    errorMessage={pinErrorMessage}
                    inputLength={16}
                    resetValues={resetValues}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!validateFormInputs()}
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>

                <Button
                    onClick={resetToDefaults}
                    variant="outlined"
                    fullWidth
                >
                    Reset
                </Button>

            </Box>

        </Box>
    );
}

export default Form;