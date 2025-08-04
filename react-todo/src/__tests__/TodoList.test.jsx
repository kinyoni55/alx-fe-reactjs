import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  it('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Add Todo' });

    await user.type(input, 'New Todo');
    await user.click(addButton);

    expect(await screen.findByText('New Todo')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  describe('TodoList Component (fireEvent version)', () => {
    it('adds a new todo using fireEvent', () => {
      // Render the component
      render(<TodoList />);
      
      // Get input and button elements
      const input = screen.getByPlaceholderText('Add a new todo');
      const addButton = screen.getByRole('button', { name: 'Add Todo' });
  
      // Simulate user input using fireEvent
      fireEvent.change(input, { target: { value: 'New Todo' } });
      
      // Simulate form submission using fireEvent
      fireEvent.click(addButton);
  
      // Verify new todo appears in the list
      expect(screen.getByText('New Todo')).toBeInTheDocument();
      
      // Verify input is cleared
      expect(input).toHaveValue('');
    });
  
    it('does not add empty todos using fireEvent', () => {
      render(<TodoList />);
      const input = screen.getByPlaceholderText('Add a new todo');
      const addButton = screen.getByRole('button', { name: 'Add Todo' });
  
      // Simulate empty input with whitespace
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.click(addButton);
  
      // Verify no new todos added (initial 2 remain)
      const todos = screen.getAllByRole('listitem');
      expect(todos).toHaveLength(2);
    });
  });

  it('deletes a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const initialDeleteButtons = screen.getAllByRole('button', { name: 'X' });
    expect(initialDeleteButtons).toHaveLength(2);

    await user.click(initialDeleteButtons[0]);

    const remainingTodos = screen.queryAllByRole('listitem');
    expect(remainingTodos).toHaveLength(1);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  it('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByRole('button', { name: 'Add Todo' });

    await user.type(input, '   ');
    await user.click(addButton);

    const todos = screen.getAllByRole('listitem');
    expect(todos).toHaveLength(2);
  });
});