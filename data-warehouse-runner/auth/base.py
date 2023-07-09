from abc import ABC, abstractmethod

class Author(ABC):
    @abstractmethod
    def auth_user(self, params):
        pass
