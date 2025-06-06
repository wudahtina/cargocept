const getStatusColor = (status: ShipmentStatus) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-500';
    case 'In Transit':
      return 'bg-blue-500';
    case 'Courier Heading to Cargo':
      return 'bg-purple-500';
    case 'Hold':
      return 'bg-orange-500';
    case 'Delivered':
      return 'bg-green-500';
    case 'Failed':
      return 'bg-red-500';
    case 'Cancelled':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: ShipmentStatus) => {
  switch (status) {
    case 'Pending':
      return 'Pending';
    case 'In Transit':
      return 'In Transit';
    case 'Courier Heading to Cargo':
      return 'Courier Heading to Cargo';
    case 'Hold':
      return 'Hold (Custom Verification)';
    case 'Delivered':
      return 'Delivered';
    case 'Failed':
      return 'Failed';
    case 'Cancelled':
      return 'Cancelled';
    default:
      return status;
  }
}; 