import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Board from './Board';

describe('Board Component', () => {
	it('renders correctly', () => {
		render(<Board />);
		expect(screen.getByTestId('board')).toBeInTheDocument();
	});
});