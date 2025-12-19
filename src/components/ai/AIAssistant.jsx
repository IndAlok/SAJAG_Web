import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Fab,
  Drawer,
  Divider,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Person,
  Close,
  AutoAwesome,
  Psychology,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateAIResponse, getQuickSuggestions } from '../../services/aiService';
import { useSelector } from 'react-redux';
import { selectAllTrainings } from '../../features/trainings/trainingsSlice';
import { selectAllPartners } from '../../features/partners/partnersSlice';

const AIAssistant = () => {
  const trainings = useSelector(selectAllTrainings);
  const partners = useSelector(selectAllPartners);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `Hello! I'm **SAJAG AI**, your intelligent assistant for disaster management training. 

I can help you with:
- 📊 Analyzing training coverage gaps
- 📅 Planning training schedules
- 🌍 Geographic distribution insights
- 📈 Performance recommendations
- ❓ Answering disaster management queries

How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const stats = {
        totalTrainings: trainings.length,
        totalParticipants: trainings.reduce((sum, t) => sum + (t.participants || 0), 0),
        activePartners: partners.length,
        statesCovered: new Set(trainings.map(t => t.state)).size,
      };
      const response = await generateAIResponse(input.trim(), { stats });
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const suggestions = getQuickSuggestions();

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Psychology />
        </Fab>
      </motion.div>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420 },
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)'
                : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                <SmartToy />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  SAJAG AI Assistant
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Powered by Gemini 2.0 Flash
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        maxWidth: '85%',
                        flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                        }}
                      >
                        {message.role === 'user' ? <Person sx={{ fontSize: 18 }} /> : <AutoAwesome sx={{ fontSize: 18 }} />}
                      </Avatar>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: message.role === 'user'
                            ? 'primary.main'
                            : message.isError
                              ? 'error.light'
                              : (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                          color: message.role === 'user' ? 'white' : 'text.primary',
                          '& p': { m: 0, mb: 1, '&:last-child': { mb: 0 } },
                          '& ul, & ol': { pl: 2, m: 0, mb: 1 },
                          '& code': {
                            bgcolor: 'rgba(0,0,0,0.1)',
                            px: 0.5,
                            borderRadius: 0.5,
                            fontFamily: 'monospace',
                          },
                          '& pre': {
                            bgcolor: 'rgba(0,0,0,0.1)',
                            p: 1,
                            borderRadius: 1,
                            overflow: 'auto',
                          },
                          '& strong': { fontWeight: 600 },
                        }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </Paper>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  <AutoAwesome sx={{ fontSize: 18 }} />
                </Avatar>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      Thinking...
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {messages.length === 1 && (
            <Box sx={{ px: 2, pb: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Quick suggestions:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {suggestions.slice(0, 4).map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion}
                    size="small"
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      '&:hover': { bgcolor: 'primary.light', color: 'white' },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Divider />
          
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Ask me anything about disaster training..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || loading}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                '&.Mui-disabled': { bgcolor: 'grey.300' },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AIAssistant;
