import React, { useState }  from "react";
import Autosuggest from 'react-autosuggest';
import { ClientData } from '../../interfaces';
import { getCLientsSuggestion } from '../../state/action-creators/clientActionCreator';

/*
const inputProps = {
        value, // usually comes from the application state
        onChange, // called every time the input value changes
        onBlur, // called when the input loses focus, e.g. when user presses Tab
        type: "text",
        placeholder: "Search Client",
        className: 'form-control',
        id: 'client'
      };
*/
interface IInputProps  {
    value: string;
    onChange (event: unknown, { newValue, method }): void;
    onBlur? (event: unknown, { highlightedSuggestion }): void;
    type?: string;
    placeholder?: string;
    className?: string;
    id?: string;
}

interface IAutoComplete {
    //value: string;
    suggestions: unknown[]; 
    populateSuggestions(value: string): void;
    onSuggestionSelected (event: unknown , { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }): void;
    renderSuggestion (suggestion: ClientData, { query, isHighlighted }): void;
    inputProps: IInputProps;
    
}

export const AutoComplete:React.FC<IAutoComplete> = ({ suggestions, renderSuggestion, populateSuggestions, onSuggestionSelected, inputProps }) => {
    console.log(suggestions)
    const onSuggestionsFetchRequested = async ({ value, reason }) => {
        console.log('value ',value);
        console.log('reason ',reason);
        populateSuggestions(value);
    }
    const onSuggestionsClearRequested = () => {
        ///setSuggestions([])
    }
    const getSuggestionValue = (suggestion: ClientData) => {
        return suggestion.name;
    }
    

    //onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method })
    
    

    

    
    return <>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
        />
    </>
}