import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Dialog from '../Dialog'

jest.mock('@radix-ui/react-visually-hidden', () => ({
  // eslint-disable-next-line react/prop-types
  VisuallyHidden: ({ children }) => <span data-testid="visually-hidden">{children}</span>
}))

describe('Dialog component', () => {
  describe('when the modal is not open', () => {
    test('does not render the dialog', () => {
      render(
        <Dialog open={false}>
          Test Dialog Content
        </Dialog>
      )

      expect(screen.queryByText('Test Dialog Content')).not.toBeInTheDocument()
    })
  })

  describe('when the modal is open', () => {
    test('renders the dialog', () => {
      render(
        <Dialog open>
          Test Dialog Content
        </Dialog>
      )

      expect(screen.queryByText('Test Dialog Content')).toBeInTheDocument()
    })
  })

  describe('when showTitle is set', () => {
    test('renders the title', () => {
      render(
        <Dialog
          open
          title="Test Title"
          showTitle
        >
          Test Dialog Content
        </Dialog>
      )

      expect(screen.queryByTestId('visually-hidden')).not.toBeInTheDocument()
    })
  })

  describe('when showTitle is not set', () => {
    test('renders a hidden title', () => {
      render(
        <Dialog
          open
          title="Test Title"
        >
          Test Dialog Content
        </Dialog>
      )

      expect(screen.queryByTestId('visually-hidden')).toBeInTheDocument()
    })
  })

  describe('when an title icon is defined', () => {
    test('renders an icon', () => {
      const IconMock = jest.fn()

      render(
        <Dialog
          open
          TitleIcon={IconMock}
          showTitle
        >
          Test Dialog Content
        </Dialog>
      )

      expect(IconMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('when a description is defined', () => {
    test('renders a description', () => {
      render(
        <Dialog
          open
          description="Test Description Content"
        >
          Test Dialog Content
        </Dialog>
      )

      expect(screen.queryByText('Test Description Content')).toBeInTheDocument()
    })
  })

  describe('when closeButton is defined', () => {
    test('renders a description', () => {
      render(
        <Dialog
          open
          closeButton
        >
          Test Dialog Content
        </Dialog>
      )

      expect(screen.queryByLabelText('Close')).toBeInTheDocument()
    })
  })
})
