from auth.base import Author

class UserTokenAuthor(Author):
    def auth_user(self, params):
        if 'uid' in params and 'token' in params:
            return True
        else:
            return False 

user_token_author = UserTokenAuthor()

def auth_user_by_token(uid, token):
    return user_token_author.auth_user({'uid': uid, 'token': token})