import React from 'react';
import { StyleSheet, View } from 'react-native';
import mainStyle from "../Styles/mainStyle.js";

import { useTheme } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';

const SearshAndFilter = () => {
    const { colors } = useTheme();
    const { allMovies, allMoviesLoading, allMoviesError, dispatchAllMovies } =
        useContext(moviesContext);


    //- Start search==============================================
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchEmpty, setIsSearchEmpty] = useState(false);

    const handelSearch = (value) => {
        setSearchQuery(value);
        const searchMovies = [];
        allMovies.results.map((movie) => {
            if (movie.original_title) {
                if (movie.title.toLowerCase().includes(value.toLowerCase())) {
                    searchMovies.push(movie);
                }
            }
        });

        if (searchMovies.length > 0) {
            setFilterMovies(searchMovies);
            setIsSearchEmpty(false);  // Search results found, so reset the "not found" state
        } else {
            setIsSearchEmpty(true);  // No search results found
            setFilterMovies([]);  // Clear the current filtered movies
        }
    };

    return (
        <View style={[mainStyle.boxContainer, { color: colors.text, margin: 0 }]}>
            <Searchbar
                style={mainStyle.search}
                placeholder="Search"
                onChangeText={(value) => { handelSearch(value) }}
                value={searchQuery}
            />
            <View style={mainStyle.filter}>
                <Dropdown
                    style={mainStyle.filter}
                    label="Filter"
                    placeholder="Select Gender"
                    options={OPTIONS}
                    value={filterilterOptions}
                    onSelect={(value) => {
                        handelFilterOptions(value);
                    }}
                    menuContentStyle={{ width: 180, position: "relative", left: -60, top: 65 }}
                    optionStyle={{ fontSize: '20px' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SearshAndFilter;
