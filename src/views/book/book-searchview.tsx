'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import BookCard from 'components/BookCard';
import Link from 'next/link';

import axios from 'utils/axios';
import { IBook } from 'types/book';
import CardHeader from '@mui/material/CardHeader';

export default function BookListPage() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchCriteria, setSearchCriteria] = React.useState<string>('title');
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [totalResults, setTotalResults] = React.useState<number>(0);
  const [currentPage, setPageNumber] = React.useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = React.useState<number>(51);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Search criteria options
  const searchOptions = [
    { value: 'title', label: 'Title', symbol: '📖' },
    { value: 'authors', label: 'Author', symbol: '👤' },
    { value: 'isbn13', label: 'ISBN', symbol: '#️⃣' },
    { value: 'average_rating', label: 'Rating Average', symbol: '⭐' },
    { value: 'original_publication_year', label: 'Year Published', symbol: '📅' }
  ];

  // API endpoint mapping for different search criteria
  const getSearchEndpoint = (criteria: string, query: string, page: number, limit: number) => {
    const baseUrl = 'https://tcss460-group1-web-api-d9b1e8b26f0f.herokuapp.com/';
    
    switch (criteria) {
      case 'title':
        return `${baseUrl}/c/books/title?title=${encodeURIComponent(query)}`;
      case 'authors':
        return `${baseUrl}/c/books/author?author=${encodeURIComponent(query)}`;
      case 'isbn13':
        return `${baseUrl}/${encodeURIComponent(query)}`;
      case 'average_rating':
        return `${baseUrl}/c/books/rating?ratingAvgBegin=${encodeURIComponent(query)}&ratingAvgEnd=${encodeURIComponent(query)}`;
      case 'original_publication_year':
        return `${baseUrl}/c/books/year?beginningYear=${encodeURIComponent(query)}&endingYear=${encodeURIComponent(query)}`;
      default:
        return `${baseUrl}/cursor?limit=${limit}`;
    }
  };

  // Load books from API (either search or browse all)
  const loadBooks = React.useCallback(async () => {
    setIsLoading(true);
    try {
      let endpoint: string;
      
      if (searchQuery.trim()) {
        // Make specific search API call based on criteria
        endpoint = getSearchEndpoint(searchCriteria, searchQuery.trim(), currentPage, resultsPerPage);
      } else {
        // Default browse all books
        endpoint = `https://tcss460-group1-web-api-d9b1e8b26f0f.herokuapp.com/c/books/cursor?limit=${resultsPerPage}&cursor=${resultsPerPage * (currentPage - 1)}`;
      }

      const response = await axios.get(endpoint);
      setBooks(response.data.entries || []);
      setTotalResults(response.data.pagination?.totalRecords || 0);
    } catch (error) {
      console.error('Error loading books:', error);
      setBooks([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, searchCriteria, currentPage, resultsPerPage]);

  // Trigger API call when search parameters change
  React.useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Debounced search to avoid too many API calls
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== searchQuery.trim()) {
        return; // Skip if there are leading/trailing spaces being typed
      }
      setPageNumber(1); // Reset to first page when search changes
      loadBooks();
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchCriteria]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCriteriaChange = (event: any) => {
    setSearchCriteria(event.target.value);
    setSearchQuery(''); // Clear search when changing criteria
  };

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchCriteria('title');
    setPageNumber(1);
  };

  const currentOption = searchOptions.find(opt => opt.value === searchCriteria);

  return (

    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}
        >
          <span style={{ fontSize: '48px' }}>📚</span>
          Book Search
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Search through our collection of books
        </Typography>
      </Box>

      {/* Search Controls */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Grid container spacing={2} alignItems="end">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Search By</InputLabel>
              <Select
                value={searchCriteria}
                label="Search By"
                onChange={handleCriteriaChange}
                endAdornment={
                  <Box sx={{ mr: 1, fontSize: '20px' }}>
                    {currentOption?.symbol}
                  </Box>
                }
              >
                {searchOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{option.symbol}</span>
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              label={`Search by ${currentOption?.label || 'Title'}`}
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={
                searchCriteria === 'average_rating' 
                  ? 'Enter minimum rating (e.g., 4.0)' 
                  : searchCriteria === 'original_publication_year'
                  ? 'Enter year (e.g., 2020)'
                  : `Enter ${currentOption?.label.toLowerCase() || 'title'}`
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <span style={{ fontSize: '20px' }}>🔍</span>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={clearSearch}
              sx={{ height: '56px' }}
              startIcon={<span>✕</span>}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Results Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {isLoading ? 'Loading...' : (
            <>
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
              {searchQuery && (
                <span style={{ fontWeight: 500 }}>
                  {' '}for "{searchQuery}" in {currentOption?.label.toLowerCase()}
                </span>
              )}
            </>
          )}
        </Typography>
      </Box>

      {/* Books Grid */}
      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Loading books...
          </Typography>
        </Box>
      ) : books.length > 0 ? (
        <Grid container columns={3} spacing={2} sx={{ justifyContent: 'spaceAround', display: 'flex', mb: 4 }}>
          {books.map((data) => (
            <Grid item key={data.isbn13 || data.title} xs={1}>
              <Link href={`/viewbookdetails/${data.isbn13}`}>
                <Box sx={{ 
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}>
                  {BookCard(data)}
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h1" sx={{ fontSize: '64px', color: 'text.disabled', mb: 2 }}>
            📚
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No books found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search criteria or search term
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {!isLoading && totalResults > resultsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(totalResults / resultsPerPage)}
            page={currentPage}
            onChange={handlePagination}
            color="primary"
            size="large"
            disabled={isLoading}
            sx={{ '& .MuiPagination-ul': { justifyContent: 'center' } }}
          />
        </Box>
      )}
    </Container>
  );
}