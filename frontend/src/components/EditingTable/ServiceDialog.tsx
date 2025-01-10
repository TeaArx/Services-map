import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Service } from './EditingTable';
import Cookies from 'js-cookie';

interface ServiceDialogProps {
  open: boolean;
  onClose: () => void;
  selectedService: Service | null;
  onSave: (service: Service, token: string) => void;
}

const ServiceDialog: React.FC<ServiceDialogProps> = ({ open, onClose, selectedService, onSave }) => {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    setService(selectedService);
  }, [selectedService]);

  const handleFieldChange = (field: keyof Service, value: string) => {
    setService((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleSave = async () => {
    if (service) {
      const token = Cookies.get('auth_token');
      if (token) {
        await onSave(service, token); 
      } else {
        console.error("Токен не найден!");
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактирования</DialogTitle>
      <DialogContent>
        {service && (
          <>
            <TextField
              autoFocus
              margin="dense"
              label="Названия"
              type="text"
              fullWidth
              value={service.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Адрес"
              type="text"
              fullWidth
              value={service.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
            />
            <TextField
              margin="dense"
              label="Описания"
              type="text"
              fullWidth
              value={service.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              multiline 
              sx={{
                resize: 'vertical', 
            }}
            />
            <TextField
              margin="dense"
              label="Частые проблемы"
              type="text"
              fullWidth
              value={service.troubleshoot}
              onChange={(e) => handleFieldChange('troubleshoot', e.target.value)}
              multiline 
              sx={{
                resize: 'vertical', 
            }}
            />
            <TextField
              margin="dense"
              label="Контейнеры сервисов"
              type="text"
              fullWidth
              value={service.portainer}
              onChange={(e) => handleFieldChange('portainer', e.target.value)}
              multiline 
              sx={{
                resize: 'vertical', 
            }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceDialog;
